# Stimulus File Uploader

A file upload component reimplemented using Stimulus, inspired by [Ryan Florence's React uploader](https://x.com/ryanflorence/status/1867399513352417547).

## Overview

This project provides a minimal, clean file upload interface using Stimulus controllers, demonstrating a pure JavaScript approach to file upload interactions.

## Prerequisites

- Ruby 3.3.5
- Node.js 20.17.0
- Yarn or npm

## Setup

Install dependencies
   ```bash
   yarn install   # or npm install
   bundle install
   ```

Start the development server
   ```bash
   bin/dev
   ```

## Features

- Stimulus-powered file upload interface
- Simulated upload process with local timer
- Lightweight and minimal implementation

## Current Limitations

- Upload functionality is currently mocked
- No actual file transmission implemented
- Intended as a demonstration/learning project

## Project Structure

- `app/javascript/controllers/upload_container_controller.js`: Manages overall upload container behavior
- `app/javascript/controllers/upload_element_controller.js`: Handles individual upload element interactions

## Future Improvements

- Implement actual file upload mechanism
- Add progress tracking
- Enhance error handling

## Livestream Creation

This project was developed live on YouTube during a coding livestream. Watch the full process:

- **Livestream:** [Building a Stimulus File Uploader](https://www.youtube.com/watch?v=eii87p_Dt_I)

## License

MIT License

Copyright (c) 2024 Stefan Froelich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgments

- Inspired by Ryan Florence's React uploader component
