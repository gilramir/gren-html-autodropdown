

DEV := main.js
.PHONY: DEV
dev: $(DEV)

PROD := main.prod.js
.PHONY: PROD
prod: $(PROD)

# CountryDatabase.gren might be in the list twice, but that's ok
GREN_SRCS = $(wildcard src/*.gren ../src/*.gren) src/CountryDatabase.gren


main.js: $(GREN_SRCS)
	gren make --output=$@ Main

main.prod.js: $(GREN_SRCS)
	gren make --optimize --output=$@ Main

src/CountryDatabase.gren : country-data.tsv generate-country-database
	./generate-country-database $< $@


.PHONY: clean
clean:
	rm -f $(DEV) $(PROD)
