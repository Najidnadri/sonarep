# SONAREP

SONARQUBE assignment. Analyze any github public repo without having to save or setup any projects. All reports, projects and repo are temporary.

# RUN LOCALLY

## PREREQUISITE 

- Windows
- Java 17
- [SonarQube V9.9 LTS Community Edition](https://www.sonarsource.com/products/sonarqube/downloads/)
- [SonarScanner V4.8](https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/)
- GitCLI



## NEXTJS

- Open another terminal and clone this repo & go into a project foler
```
git clone https://github.com/Najidnadri/sonarep
cd sonarep
```

- Create `.env` file in the root folder with these fields
```
USERTOKEN=
SONARQUBESTARTCMD=
NEXT_PUBLIC_FIRSTIME=
NEXT_PUBLIC_USERNAME=
NEXT_PUBLIC_USERPASSWORD=
```

- run the program
```bash
# First time and after setup
npm run setupstart

# Consecutive 
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser and follow the setup wizard

And that's all. just copy and paste the github link and wait for about 2mins.


# FEATURES

- [x] Working API.
- [x] Websocket Communication
- [x] Basic Metrics
- [x] Automate Sonarqube startup & auth
- [x] Add First-Time setup wizard / helper

# IMPLEMENTATIONS
Sonarep are meant to be used on the fly without having too much hassle on each git repo analysis. Hence, Sonarep does not keep any history of the past analysis. 

Sonarep make use of websocket connection between NextJs Client & Sever to handle smooth communication without having to worry about Timeout Error. Sonarep also relies on WebAPI expose by SonarQube to create, delete projects & query report.

Other than that, under the hood, Sonarep uses CLI commands like Git & Sonar-Scanner to handle temp folders & start analysis.

API diagram:
![API DIAGRAM](./pics/APIdiagram.png)


# INSTRUCTION VIDEO
./pics/instruction.MOV
<video src='./pics/instruction.MOV' width=1000 />


