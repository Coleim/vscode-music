// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
const sound = require("sound-play");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-music" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('code-music.start', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Let\'s code in Music!');
	});

	context.subscriptions.push(disposable);

    vscode.workspace.onDidChangeTextDocument(event => {
        const changes = event.contentChanges;
        if (changes.length > 0) {
            const lastChange = changes[changes.length - 1];
            console.log(`lastChange: `, lastChange);
            for( let charIdx = lastChange.rangeLength; charIdx < lastChange.text.length; charIdx++ ) {
                if(lastChange.text[charIdx].replace(/\s/g, '') !== '') {
                    playSoundForKey(lastChange.text[charIdx]);
                }
            }
        }
    });

}

function playSoundForKey(key: string) {
    console.log(`playSoundForKey: `, key);
    const pianoKeySoundMap: { [key: string]: string } = {
        // Letters (lowercase and uppercase)
        a: 'A1.mp3', A: 'A2.mp3',
        b: 'B1.mp3', B: 'B2.mp3',
        c: 'C1.mp3', C: 'C2.mp3',
        d: 'D1.mp3', D: 'D2.mp3',
        e: 'E1.mp3', E: 'E2.mp3',
        f: 'F1.mp3', F: 'F2.mp3',
        g: 'G1.mp3', G: 'G2.mp3',
        h: 'A3.mp3', H: 'A4.mp3',
        i: 'B3.mp3', I: 'B4.mp3',
        j: 'C3.mp3', J: 'C4.mp3',
        k: 'D3.mp3', K: 'D4.mp3',
        l: 'E3.mp3', L: 'E4.mp3',
        m: 'F3.mp3', M: 'F4.mp3',
        n: 'G3.mp3', N: 'G4.mp3',
        o: 'A5.mp3', O: 'A6.mp3',
        p: 'B5.mp3', P: 'B6.mp3',
        q: 'C5.mp3', Q: 'C6.mp3',
        r: 'D5.mp3', R: 'D6.mp3',
        s: 'E5.mp3', S: 'E6.mp3',
        t: 'F5.mp3', T: 'F6.mp3',
        u: 'G5.mp3', U: 'G6.mp3',
        v: 'A7.mp3', V: 'As1.mp3',
        w: 'B7.mp3', W: 'As2.mp3',
        x: 'C7.mp3', X: 'As3.mp3',
        y: 'D7.mp3', Y: 'As4.mp3',
        z: 'E7.mp3', Z: 'As5.mp3',

        // Numbers
        '0': 'C8.mp3',
        '1': 'Cs1.mp3',
        '2': 'D1.mp3',
        '3': 'Ds1.mp3',
        '4': 'E1.mp3',
        '5': 'F1.mp3',
        '6': 'Fs1.mp3',
        '7': 'G1.mp3',
        '8': 'Gs1.mp3',
        '9': 'A1.mp3',

        // Punctuation and symbols
        '!': 'B1.mp3',
        '@': 'C2.mp3',
        '#': 'Cs2.mp3',
        '$': 'D2.mp3',
        '%': 'Ds2.mp3',
        '^': 'E2.mp3',
        '&': 'F2.mp3',
        '*': 'Fs2.mp3',
        '(': 'G2.mp3',
        ')': 'Gs2.mp3',
        '-': 'A2.mp3',
        '_': 'B2.mp3',
        '=': 'C3.mp3',
        '+': 'Cs3.mp3',
        '[': 'D3.mp3',
        ']': 'Ds3.mp3',
        '{': 'E3.mp3',
        '}': 'F3.mp3',
        '\\': 'Fs3.mp3',
        '|': 'G3.mp3',
        ';': 'Gs3.mp3',
        ':': 'A3.mp3',
        "'": 'B3.mp3',
        '"': 'C4.mp3',
        ',': 'Cs4.mp3',
        '.': 'D4.mp3',
        '<': 'Ds4.mp3',
        '>': 'E4.mp3',
        '/': 'F4.mp3',
        '?': 'Fs4.mp3',
        '`': 'G4.mp3',
        '~': 'Gs4.mp3',
        // Space and control characters
        ' ': 'A4.mp3',  // Space
        '\n': 'B4.mp3', // Enter
        '\t': 'C5.mp3', // Tab
    };
    const soundFile = pianoKeySoundMap[key];
    if (soundFile) {
        const soundPath = path.join(__dirname, '..', 'sounds/piano', soundFile);
        sound.play(soundPath);
    }
}

// This method is called when your extension is deactivated
export function deactivate() {}
