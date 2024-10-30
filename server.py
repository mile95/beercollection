import http.server
import socketserver

PORT = 8080

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()
    
with socketserver.TCPServer(("", PORT),MyHttpRequestHandler) as httpd:
    print("serving at port 8080")
    httpd.serve_forever()
