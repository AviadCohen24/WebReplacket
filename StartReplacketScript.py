import os
import subprocess

current_directory = os.getcwd()
frontend_directory = current_directory + '\web-replacket'
backend_directory = current_directory + '\ReplacketServer'
process = subprocess.Popen(['dotnet', 'run'], cwd=backend_directory, shell=True)
process = subprocess.Popen(['npm', 'start'], cwd=frontend_directory, shell=True)
print("Replacket has been launched")