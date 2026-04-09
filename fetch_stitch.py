import json, urllib.request, subprocess, os

# Use environment variable or replace with your key
API_KEY = os.environ.get("STITCH_API_KEY", "YOUR_GCP_API_KEY_HERE")
MCP_URL = "https://stitch.googleapis.com/mcp"
PROJECT_ID = "2730923267748141666"

SCREENS = [
    ("Dashboard", "bd04b1c0abfb4392af847b6bd6df2a12"),
    ("Editor",    "254f42409cf94f22bb88d338b0ed611b"),
    ("Login",     "eb8c62a20c264f2f94024ddb97ac5130"),
]

os.makedirs("stitch_output", exist_ok=True)

def mcp_call(method, arguments):
    payload = json.dumps({
        "jsonrpc": "2.0", "id": 1, "method": "tools/call",
        "params": {"name": method, "arguments": arguments}
    }).encode()
    req = urllib.request.Request(MCP_URL, data=payload, headers={
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
    }, method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())

for name, screen_id in SCREENS:
    print(f"\n=== {name} ===")
    result = mcp_call("get_screen", {"project_id": PROJECT_ID, "screen_id": screen_id})
    raw_text = result["result"]["content"][0]["text"]
    data = json.loads(raw_text)

    # Download screenshot
    img_url = data["screenshot"]["downloadUrl"]
    img_path = f"stitch_output/{name}.png"
    subprocess.run(["curl", "-sL", img_url, "-o", img_path], check=True)
    print(f"  ✓ Screenshot → {img_path}")

    # Download HTML code
    html_url = data["htmlCode"]["downloadUrl"]
    html_path = f"stitch_output/{name}.html"
    subprocess.run(["curl", "-sL", html_url, "-o", html_path], check=True)
    print(f"  ✓ HTML code  → {html_path}")

print("\nAll done.")
