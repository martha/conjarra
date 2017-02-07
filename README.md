# conjarra

[Conjarra](https://conjarra.herokuapp.com/) is a quick conjugation quiz app I threw together, using Fred Jehle's awesome [database](https://github.com/ghidinelli/fred-jehle-spanish-verbs) of Spanish verbs and conjugations.

## todo
- server fetch and cache verb data while waiting for user answers
- could actually do the whole 9 yards js lint thing
- write a proper readme lol (project goals incl. no jquery)
- landing page loading bar (sangría?)
- favicon
- about page / links
- consistent spanish within code
- hover for english
- timer clock
- weight to irregular verbs?
- compile / minify
- testing
- debugging express nodehero tutorial
- for good?

## done
- installed node, postgres, heroku
- `createdb verbos`
- `psql verbos < jehle_verb_postgresql.sql`
- `heroku create`, then `git push heroku master`
- jslint: first http://www.jslint.com/, then http://www.javascriptlint.com/online_lint.php