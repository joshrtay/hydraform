#
# Vars
#

BIN = ./node_modules/.bin
.DEFAULT_GOAL := all

#
# Tasks
#

test:
	@node test/*.js

validate:
	@standard

all: validate test

init:
	@git init
	@git add .
	@git commit -am "FIRST"
	@hub create joshrtay/node-lambda-zip -d "Zip a node lambda."
	@travis enable
	@git push -u origin master

#
# Phony
#

.PHONY: test validate all init
