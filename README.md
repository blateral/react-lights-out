# React Lights Out

Ziel diese Workshops ist es, Ihnen den Umgang mit React zu vermitteln. Dabei sollen vor allem die funktionalen und deklarativen Konzepte sowie der unidirektionale Datenfluss dieser Technologie praktisch erläutert werden.

### Hilfreiche Links:
- [JSX](https://facebook.github.io/react/docs/introducing-jsx.html)
- [Events](https://facebook.github.io/react/docs/handling-events.html)
- [Rendering von Listen](https://facebook.github.io/react/docs/lists-and-keys.html)

## Setup
1. Repo klonen (einmalig)
1. `npm install` (einmalig)
1. `npm start`

## Game Engine
Da wir uns ausschließlich auf React konzentrieren wollen, gibt es die gesamte Spiellogik schon als fertiges JS-Modul:

```javascript
import { createGame } from '../lib/game'; 

// Factory - kreiert ein lösbares LightOut Spiel
const gameEngine = createGame();

/* 
Liefert das aktuelle Board als 5x5 Matrix zurück. Wobei true "Licht an" bedeutet.
Z.B.: [
  [ true, true, true, false, true],
  [ true, false, true, false, false],
  [ true, true, true, true, false],
  [ true, true, true, true, false],
  [ true, true, true, false, true],
] 
*/
gameEngine.getBoard()

// Setzt das Feld an den angegebenen Koordinaten auf den Umkehrzustand. 
// Liefert nichts zurück. 
// Das neue Board muss abermals über getBoard() angefragt werden.
gameEngine.toggleField({row: 1, col: 3})

// Gibt an, ob das Spiel gelöst (true) wurde oder noch im Gange ist (false). 
// Liefert true oder false zurück
gameEngine.isBoardSolved()
```

## Komponenten
Die App könnte wie folgt aufgebaut sein:

```markup
<App>
  <Board>
    <Light />
    <Light />
    <Light />
    <Light />
    <Light />
    [ ... ]
  </Board>
</App>
```

Der Datenfluss erfolgt unidirektional, d.h. Daten aus der Game-Engine werden ausschließlich von `<App>` gesteuert. Die Klicks auf die `<Light>`s werden durch `<Board>` zu `<App>` durchgereicht.

### App
Die `<App>`-Komponente ist die "Smart Component" hier im Spiel. Sie fragt das aktuelle Board über die Game-Engine an und hält dieses als `state`.

Des Weiteren kümmert sich `<App>` um das Rendering der <Board>-Komponente. Sobald die Meldung von `<Board>` kommt, dass darauf ein Button geklickt wurde, teilt sie das der Game-Engine mit und fragt darauf das neue Board an. Dieses wird dann wieder im `state` gespeichert.

### Board
Kümmert sich um die Darstellung der `<Light>`s in einer 5x5 Matrix. (Hierfür eignet sich CSS-Flexbox besonders gut.) Diese Komponente kennt keinen State, keine Game-Engine und keine `<App>`-Komponente

`<Board>` erwartet folgende Props:
- **items**: das aktuelle Gameboard
- **onLightClicked**: Klickhandler-Funktion mit Zeilen- und Spaltenindex

### Light
Klickbare Schaltfläche, die entweder an oder aus ist. Diese Komponente kennt keinen State, keine Game-Engine, keine `<Board>`- und `<App>`-Komponente.

`<Light>` erwartet folgende Props:
- **active**: true oder false
- **onClick** Klickhandler-Funktion

## Optionale Komponenten

### ResetButton
Ein Button, um das Spiel neu zu starten

### ClickCounter
Anzeige der bereits getätigten Klicks auf `<Light>`s

### GameOver
Anzeige, wenn das Spiel gewonnen wurde
