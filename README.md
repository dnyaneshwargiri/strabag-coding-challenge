# Employee Document Manager

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="https://dnyaneshwargiri-employee-app.netlify.app/" target="blank">Live Demo</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A document management web app built with Angular 18, Angular Material, and AG Grid, featuring CRUD functionality with modal-based forms and a responsive data grid. It follows best practices using standalone components and reactive forms.

### Built With

Below are frameworks/ libraries used to bootstrap this project.

- ![Angular](https://img.shields.io/badge/angular-%2320232a.svg?style=for-the-badge&logo=angular&logoColor=%2361DAFB)
- ![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
- ![Material](https://img.shields.io/badge/-Material-%230170FE?style=for-the-badge&logo=Material&logoColor=white)
- ![AgGrid](https://img.shields.io/badge/-AgrGrid-%230170FE?style=for-the-badge&logo=aggrid&logoColor=white)
- ![Pnpm](https://img.shields.io/badge/pnpm-%232C8EBB.svg?style=for-the-badge&logo=pnpm&logoColor=white)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![Jasmine](https://img.shields.io/badge/jasmine-%23C63D14.svg?style=for-the-badge&logo=jasmine&logoColor=%23FFFFFF)

## Getting Started

Below are instructions on setting up your project locally.

### Prerequisites

- Node 21
- Pnpm 9.14.4
- Typescript: ~5.5.2
- Angular: ^18.2.0

### Installation

1. Clone the repo
   ```sh
    git clone https://github.com/dnyaneshwargiri/strabag-coding-challenge.git
   ```
2. Go to project directory
    ```sh
    cd employee-app
   ```
3. Install NPM packages
   ```sh
    pnpm install/ yarn install
   ```
4. Compile Angular app
   ```sh
   pnpm build
   ```
5. Run
   ```sh
   pnpm dev /* dev mode */
   ```

## Test and Lint

Run test cases

```sh
pnpm test
```

Check for linting Warnings, Error

```sh
pnpm lint
```

## To run application via Docker Image

1. Build application for production
   ```sh
     pnpm build
   ```
2. Build Docker image
   ```sh
     chmod +x ./docker.build.sh
   ```
   ```sh
    sh ./docker.build.sh
   ```
3. Run Docker image
   ```sh
     docker run -p 4000:4000 employee-app
   ```

Please be informed commits are intentionly not squashed.

## Open issues
Oberveed console error for modal ==> Blocked aria-hidden on an element because its descendant retained focus.