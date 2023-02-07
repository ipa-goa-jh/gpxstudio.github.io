export default class Tools {

    constructor(buttons) {
        this.urlCheck = 'ws://localhost:6789';
        this.urlPOI = 'ws://localhost:6790';
        this.buttons = buttons;

        const _this = this;
    }

    checkRoute(total) {
        let socket = new WebSocket(this.urlCheck);

        const mergeAll = false;
        const time = false;
        const hr = false;
        const atemp = false;
        const cad = false;
        const power = false;
        const surface = false;

        var trace = total.traces[total.focusOn];
        const titles = [trace.name + ' Annotated', trace.name + ' Blocked', trace.name + ' Blockades'];

        var title_index = 0;

        socket.onopen = function(e) {
            var output = total.outputGPX(mergeAll, time, hr, atemp, cad, power, surface, total.focusOn);
            socket.send(output[0].text);
        };
        
        socket.onmessage = function(event) {
            var title = titles[title_index];
            var callback = function (trace) {};
            total.addTrace(event.data, title, callback);
            title_index += 1;
        };
        
        socket.onclose = function(event) {
          if (event.wasClean && title_index==3) {
          } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[close] Connection died');
          }
        };
        
        socket.onerror = function(error) {
          alert(`[error]`);
        };
    }

    generatePOI(total) {
        let socket = new WebSocket(this.urlPOI);

        const mergeAll = false;
        const time = false;
        const hr = false;
        const atemp = false;
        const cad = false;
        const power = false;
        const surface = false;

        var trace = total.traces[total.focusOn];
        const title = trace.name + ' with POIs';

        socket.onopen = function(e) {
            var output = total.outputGPX(mergeAll, time, hr, atemp, cad, power, surface, total.focusOn);
            socket.send(output[0].text);
        };
        
        socket.onmessage = function(event) {
            var callback = function (trace) {};
            total.addTrace(event.data, title, callback);
        };
        
        socket.onclose = function(event) {
          if (event.wasClean) {
          } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[close] Connection died '+ title_index);
          }
        };
        
        socket.onerror = function(error) {
          alert(`[error]`);
        };
    }
}

//this.checkAllFilesInFolder(data.docs[0].id, buttons.total.outputGPX(mergeAll, time, hr, atemp, cad, power, surface));
/*
            tools.checkRoute();
        });
        this.tool_poi.addEventListener("click", function () {
            tools.generatePOI();

            let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error]`);
};
            */