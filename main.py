from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from together import Together
from dotenv import load_dotenv
import os
import uvicorn

# Load environment variables
load_dotenv()

# Initialize Together client
def get_model_client():
    """Initializes and returns the Together client."""
    api_key = os.getenv("TOGETHER_API_KEY")
    if not api_key:
        raise ValueError("TOGETHER_API_KEY environment variable not set.")
    return Together(api_key=api_key)

try:
    client = get_model_client()
except ValueError as e:
    print(f"Error initializing Together client: {e}")
    # Decide how to handle this - exit, or run without the client?
    # For now, let's allow the app to start but the endpoint will fail.
    client = None

# FastAPI app instance
app = FastAPI(title="AI STEM Tutor API")

# --- CORS Configuration ---
# Define the origins allowed to connect. 
# For development, you might allow your frontend dev server (e.g., http://localhost:3000)
# For production, list your actual frontend domain(s).
origins = [
    "http://localhost:3000",  # Default Next.js dev port
    "http://127.0.0.1:3000", # Also allow loopback
    # Add any other origins if needed (e.g., your deployed frontend URL)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Request body model
class ChatRequest(BaseModel):
    prompt: str
    history: list[dict] = [] # Optional history [{"role": "user/assistant", "content": "..."}, ...]
    memory_summary: str | None = None # Optional summary

# Response body model
class ChatResponse(BaseModel):
    reply: str
    new_memory_summary: str | None = None # If summarization happened

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Receives user prompt and history, returns AI response."""
    if not client:
        raise HTTPException(status_code=500, detail="AI client not initialized. Check TOGETHER_API_KEY.")

    current_memory_summary = request.memory_summary
    new_memory_summary = None

    # --- Basic Summarization Logic (similar to Streamlit) ---
    # Consider refining this logic based on actual usage patterns
    MAX_HISTORY_FOR_PROMPT = 10 # How many recent messages to send directly
    SUMMARIZE_THRESHOLD = 20 # When to trigger summarization

    if len(request.history) > SUMMARIZE_THRESHOLD and current_memory_summary is None:
        print("Attempting to summarize conversation...")
        try:
            old_msgs_content = [m["content"] for m in request.history[:-MAX_HISTORY_FOR_PROMPT] if m["role"] in ["user", "assistant"]]
            full_text = "\n".join(old_msgs_content)
            summary_prompt_text = f"Summarize the following conversation for future context:\n\n{full_text}"

            summary_response = client.chat.completions.create(
                model="deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free", # Or your preferred summary model
                messages=[{"role": "user", "content": summary_prompt_text}]
            )
            current_memory_summary = summary_response.choices[0].message.content
            new_memory_summary = current_memory_summary # Store the new summary
            print("Summarization successful.")
        except Exception as e:
            print(f"Warning: Memory summarization failed: {e}")
            # Proceed without summary if it fails

    # --- Build messages for the main chat completion ---
    messages_for_api = []
    if current_memory_summary:
        messages_for_api.append({"role": "system", "content": f"Here is a summary of earlier conversation: {current_memory_summary}"})

    # Add recent history
    messages_for_api.extend(request.history[-MAX_HISTORY_FOR_PROMPT:])

    # Add the current user prompt
    messages_for_api.append({"role": "user", "content": request.prompt})

    # --- Call Together AI ---
    try:
        print(f"Sending prompt to model: {request.prompt}")
        response = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free", # Your main chat model
            messages=messages_for_api
        )
        bot_reply = response.choices[0].message.content
        print("Received reply from model.")
        return ChatResponse(reply=bot_reply, new_memory_summary=new_memory_summary)

    except Exception as e:
        print(f"Error calling Together API: {e}")
        raise HTTPException(status_code=500, detail=f"Error interacting with AI model: {e}")

# --- Add root endpoint for basic check ---
@app.get("/")
async def root():
    return {"message": "AI STEM Tutor API is running."}

# --- Run the server (for local development) ---
if __name__ == "__main__":
    print("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
