@echo off
sc create "MercanFrontend" binPath= "powershell.exe -ExecutionPolicy Bypass -File C:\xampp\htdocs\mercandanismanlik\frontend\mercan-frontend\start-server.ps1" start= auto
sc description "MercanFrontend" "Mercan Danismanlik Frontend Sunucusu"
sc start "MercanFrontend"
pause 