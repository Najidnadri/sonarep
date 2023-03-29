# SONAREP

SONARQUBE assignment. Analyze any github public repo without having to save or setup any projects. All reports, projects and repo are temporary.

# RUN LOCALLY

## PREREQUISITE 

- Windows
- Java 17
- [SonarQube V9.9 LTS Community Edition](https://www.sonarsource.com/products/sonarqube/downloads/)
- [SonarScanner V4.8](https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/)
- GitCLI

## RUN SONARQUBE SERVER

- **STARTUP:** After downloaded the SonarQube, extract it anywhere you prefer and run `StartSonar.bat` file from a `Command Prompt`.
```
..ParentFolders/sonarqube/bin/windows/StartSonar.bat
```
- Give it a minute, a log that says `SonarQube is operational` should appear soon
- **LOGIN:** Visit `http://127.0.0.1:9000`, a login page should be showing. use `admin` for both username & pass. You will be asked to change your password afterwards.
- Then, you will be redirected to this project setup page
![Project Setup Page](./pics/sonardashbard.png)
- **CREATE TOKEN:** Nevermind this, go straight to **Profile>My Account>Security** and create a `user token`. **Copy it somewhere else first**
![Project Setup Page](./pics/generateToken.png)
- **DISABLE SCM:** At the top bar, go to **Administration>SCM** and disable it.
- Done, just let the terminal open and proceed to next step

## SETUP SONARSCANNER
- Once downloaded, extract it anywhere you prefer and make the binary `sonar-scanner.bat` inside it available at `PATH`

## NEXTJS

Open another terminal and clone this repo & go into the project foler
```
git clone https://github.com/Najidnadri/sonarep
cd sonarep
```

Install dependencies
```
npm run install
```

Setup `.env`, paste the `userToken` you copied in the SonarQube
```
USERTOKEN=[your token here]
```

Run development
```
npm run dev
```

Or run production preview
```
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

And that's all. just copy and paste the github link and wait for about 60s.


# FEATURES

- [x] Working API.
- [x] Websocket Communication
- [x] Basic Metrics
- [ ] Automate Sonarqube startup & auth
- [ ] Add First-Time setup wizard / helper

# IMPLEMENTATIONS
Sonarep are meant to be used on the fly without having too much hassle on each git repo analysis. Hence, Sonarep does not keep any history of the past analysis. 

Sonarep make use of websocket connection between NextJs Client & Sever to handle smooth communication without having to worry about Timeout Error. Sonarep also relies on WebAPI expose by SonarQube to create, delete projects & query report.

Other than that, under the hood, Sonarep uses CLI commands like Git & Sonar-Scanner to handle temp folders & start analysis.

API diagram:
![API DIAGRAM](./pics/APIdiagram.png)



