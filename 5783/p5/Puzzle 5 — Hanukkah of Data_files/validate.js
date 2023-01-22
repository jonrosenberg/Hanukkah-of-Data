function startPuzzle(puznum) {
    window.localStorage.setItem("start_p"+puznum, new Date().getTime());
}

function prettyTime(t) {
    if (t > 7000*1000) {
        return Math.round(t/(3600*1000)) + ' hours';
    } else if (t > 0) {
        return Math.round(t/(60*1000)) + ' minutes';
    }
    return '';
}


function getSolvePretty(puznum)
{
    let solvetime = getSolveTime(puznum);
    if (solvetime < Date.UTC(2022)) {
        return ''; // unsolved
    }
    let dt = solvetime-getStartTime(puznum);
    if (dt <= 0 || dt > 100*365*24*3600*1000) {
        return ''; // invalid
    }
    return prettyTime(dt);
}

function getNumTries(puznum) {
    return parseInt('0' + window.localStorage.getItem("tries_"+puznum));
}

function getStartTime(puznum) {
  let r = window.localStorage.getItem("start_p"+puznum);
  if (r == null || r <= 0) {
      return 0;
  }
  return parseInt(r);
}

function getSolveTime(puznum) {
  let r = window.localStorage.getItem("solve_p"+puznum);
  return parseInt(r);
}

function isLit(puznum) { return getSolveTime(puznum) > 0; }

// puzzle 0 (shamash) start time shows when candles are available
function canBeLit(puznum) {
    let now = new Date().getTime();
    let dayZero = Date.UTC(2022, 11, 18, 16, 0, 0, 0);

	let todayNum = Math.floor((now - dayZero)/(24*3600*1000) + 1);
    if (dayZero <= 0 || (!isLit(0) && (puznum != 0))) {
        return false;
    }
    return now > dayZero + (puznum-1)*24*3600*1000;
}

function resetPuzzle(puznum) {
    window.localStorage.setItem("start_p"+puznum, 0);
    window.localStorage.setItem("solve_p"+puznum, 0);
}

function resetPuzzles() {
	let now = new Date().getTime();
	for (i=0; i < 9; ++i) {
		resetPuzzle(i);
	}
    startPuzzle(0);
}

function setupAnswerForm(form) {
    let qnum = form.querySelector('#qnum').value;
    let puznum = parseInt(qnum.slice(1));
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        v = e.target.querySelector('#answer').value;

        if (btoa(v) == answers[qnum]) {
            now = new Date();
            window.localStorage.setItem("solve_"+qnum, now.getTime());
            msg = "<br/>Correct!  The candle is now lit."
            if (puznum == 8) {
                setTimeout(() => { window.location = "../9"; }, 1000);
            } else {
                setTimeout(() => { window.location = "../"; }, 1000);
            }
        } else {
            window.localStorage.setItem("solve_"+qnum, 0);
            msg = "<br/>Hmmm, that doesn't seem right.  Try again?";
        }

        window.localStorage.setItem("tries_"+puznum, getNumTries(puznum)+1);
        form.querySelector('#correct').innerHTML = msg;
    })

    if (getStartTime(puznum) <= 0) {
        console.log('starting puzzle ' + puznum);
        startPuzzle(puznum);
    }

    solvetime = getSolveTime(puznum);
    if (solvetime > 0) {
        msg = `[Puzzle ${puznum} was solved`;
        solvestr = getSolvePretty(puznum);
        if (solvestr != '') {
            msg += ` in ${solvestr}.`;
        }
        let nextpuznum = puznum + 1;
        if (canBeLit(nextpuznum)) {
            msg += ` <a href="../${nextpuznum}">Go to puzzle ${nextpuznum}</a>.`;
        }
        if (false) { // dev
            msg += `Or <a href="#" onclick="resetPuzzle(${puznum}); window.location.reload(); return false;">unsolve this puzzle</a>`;
        }
        msg += ']'
        form.innerHTML = msg;
    }
}

function solvePuzzles() {
    for (i=0; i < 9; ++i) {
        window.localStorage.setItem("solve_p"+i, 1);
    }
}

document.querySelectorAll('form.answer').forEach(setupAnswerForm);
