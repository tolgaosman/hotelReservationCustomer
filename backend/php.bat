@echo off
"%~dp0bin\php\php.exe" -d opcache.enable=0 -d opcache.enable_cli=0 %*
