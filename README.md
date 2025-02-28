# UMG FRONTEND APP

Application that interacts with the [REST API](https://github.com/flaviobarbosa/umg-backend) for requesting metadata of a music track from an external service storing it in a
database.

## Run Locally

Clone the project

```bash
  git clone https://github.com/flaviobarbosa/umg-frontend
```

Go to the project directory

```bash
  cd umg-frontend
```

Build docker image

```bash
docker build -t umg-frontend .
```

Start the application

```bash
docker run -p 5173:5173 umg-frontend
```

## Screenshots

#### Inicial Screen

![alt text](readme_screenshots/initial_screen.png)

#### Create Metadata

![alt text](readme_screenshots/create1.png)

![alt text](readme_screenshots/create2.png)

#### Initial Screen with created Metadata

![alt text](readme_screenshots/initial_screen_with_data.png)

#### Track Metadata

![alt text](readme_screenshots/track_metadata.png)

#### Trying to add an created metadata

![alt text](readme_screenshots/duplicate.png)
