
    // Variáveis para cliente MQTT
    var mqtt;
    var reconnectTimeout = 2000;
    var host = "broker.mqtt-dashboard.com";
    var port = 8000;
    var client = "pensador"

    function onConnect() {
      // Conexao ao Broker
      console.log("Conectado 3");
      mqtt.subscribe("pensador");
      const sub =document.getElementById("on");
      var rec = sub.innerHTML  
      
      console.log(sub.innerHTML)

      if(rec == "off"){
          ligarLuz();
          document.getElementById("on").innerHTML = "on";
          document.getElementById("on").style.background="#00FF00";

      }
      if(rec == "on"){
          desligarLuz();
          document.getElementById("on").innerHTML = "off";
          document.getElementById("on").style.background="red";

      }
      
    }

    function onError(message) {
      // Ocorrencia de erro
      console.log("Falha: " + message.errorCode + " " + message.errorMessage);
      setTimeout(MQTTConnect, reconnectTimeout);
    }

    function onMessageArrived(msg) {
      // Mensagem recebida
      console.log("Mensagem: " + msg.destinationName + "=" + msg.payloadString);
     
      
    }

    function ligarLuz(){
    
        message = new Paho.MQTT.Message ("ligar luz");
        message.destinationName = 'pensador' 
        mqtt.send (message);
        console.log("uuuuui",message.payloadString)

    }

    function desligarLuz(){
    
        message = new Paho.MQTT.Message ("desligar luz");
        message.destinationName = 'pensador' 
        mqtt.send (message);
        console.log(message.payloadString)

    }

    function MQTTConnect() {
      // Conecta no Broker
      console.log("Conectando " + host + " " + port);
      mqtt = new Paho.MQTT.Client(host, port, client + parseInt(Math.random() * 1e5));
      var options = { timeout: 10,
                      useSSL:true,
                      keepAliveInterval: 10,
                      onSuccess: onConnect,
                      onFailure: onError
                    };
      mqtt.onMessageArrived = onMessageArrived;
      mqtt.onConnectionLost = onError;
      mqtt.connect(options);
    }
