BIN = node

PORT = $(shell echo $$PORT)
ifeq ($(strip $(PORT)),)
	PORT = 4003
endif

test:
	@NODE_ENV=test $(BIN) ./node_modules/.bin/mocha --recursive

test-cover:
	@NODE_ENV=test $(BIN) ./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- \
		--recursive

coverage-server:
	 ./node_modules/.bin/http-server ./coverage -p $(PORT)

.PHONY: test bench
