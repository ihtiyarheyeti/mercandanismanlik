Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\xampp\htdocs\mercandanismanlik\frontend\mercan-frontend"
WshShell.Run "cmd /c npm run dev", 0, False 