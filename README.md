# conjarra

## todo
- fix verification when we don't use all
- not finding the subjunctives
- do imperatives work?
- consistent spanish within code
- gerund maybe
- make sure encoding always accepts accents
- favicon
- about page / links
- hover for english
- add in freaking semicolons to server code
- could actually do the whole 9 yards js lint thing
- write a proper readme lol (project goals incl. no jquery)
- landing page loading bar (sangría?)
- timer clock
- weight to irregular verbs?
- compile / minify
- testing
- debugging express nodehero tutorial
- for good?

## done
- installed node, bla blah
- installed postgres
- createdb verbos
- psql verbos < fred-jehle-spanish-verbs/jehle_verb_postgresql.sql



/*
      var len = result.rows.length;
      for (var i = 0; i < len; i++) {
        var row = result.rows[i];
        verify(row.mood, row.tense, row[persona], req.body);
      }

      function verify(mood, tense, answer, submitted) {
        console.log(mood + '_' + tense + ' ' + answer);
        switch(mood) {
          case 'Indicativo':
            if (submitted[prettify(tense)] != answer) {
              // console.log('error: ' + submitted[prettify(tense)] + 
              //   ' is not ' + answer);
              equivocaciones[prettify(tense)] = answer;
            }
            break;
          case 'Subjuntivo':
            if (submitted[prettify(tense + ' ' + mood)] != answer) {
              // console.log('error: ' + submitted[prettify(tense + ' ' + mood)] + 
              //   ' is not ' + answer);
              equivocaciones[prettify(tense + ' ' + mood)] = answer;
            }
            break;
          case 'Imperativo Afirmativo':
          case 'Imperativo Negativo':
            if (submitted[prettify(mood)] != answer) {
              // console.log('error: ' + submitted[prettify(mood)] + 
              //   ' is not ' + answer);
              equivocaciones[prettify(mood)] = answer;
            }
            break;
        }
      }

      function prettify(str) {
        return str.replace(/ /g,"_").toLowerCase();
      }*/

      // function parseKey(str) {
      //   str = str.replace(/_/g, " ");
      //   console.log(str);
      // }