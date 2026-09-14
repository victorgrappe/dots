# dots
## Introduction

This repository contains an obsidian vault intended to manage a personal knowledge graph.

## Setup

Steps to set up the `dots` project

## Commands



## Terminology
- `dot`: The core primitive concept from wich every structure is build around.
	- Every `dot`is materialized by a `./dots/{}.md` file
	- The relations between every `dot`is materialized in the frontmatter bloc 
## Directories

Important directories in the project
- `dots/{}.md`: Contains the `dot`files. Each file is a `dot` 
	- `dots/base/{}.base`: Contains the `.base` obsidian files intended to query and display dots in a structured way 
	- `dots/template/{}.md`: Contains the file templates to create dots 
- `sync/`: Contains scripts for syncing data between different sources.
- `.agents/`: Contains the main agent scripts that perform various task.
- `.obsidian/`: Contains configuration files for the Obsidian application.
