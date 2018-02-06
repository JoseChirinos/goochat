var track = {
    preload: null,
    manifest: [
        {'id':'soundNotification',src:'./assets/audio/ding.mp3'},
        {'id':'soundSend',src:'./assets/audio/MessageNonzerobot.mp3'}
    ],
    init: function(){
        this.preload = new createjs.LoadQueue(false, "/");
        this.preload.on("fileload", this.handleFileLoad);
        this.preload.on("progress", this.handleOverallProgress);
        this.preload.on("error", this.handleFileError);
        this.preload.on("complete", this.handleComplete);
        this.preload.setMaxConnections(5);
        this.loadAll();
    },
    stop: function(){
        if (this.preload != null) {
            this.preload.close();
        }
    },
    loadAll: function(){
        var self = this;
        this.manifest.forEach(function(el){
            self.loadAnother(el);
        })
    },
    loadAnother: function(el){
        var item = el;
        this.preload.loadFile(item);
    },
    handleComplete: function(){
        console.log('carga completada completado');
    },
    handleFileLoad: function(event){
        console.log(event.result);
        if(event.item.id === 'soundNotification'){
            var el = document.createElement('div');
            el.setAttribute('id','soundNotification');
            el.append(event.result);
            document.querySelector('#e').append(el);
        }
        if(event.item.id === 'soundSend'){
            var el = document.createElement('div');
            el.setAttribute('id','soundSend');
            el.append(event.result);
            document.querySelector('#e').append(el);
        }
    },
    handleOverallProgress: function(event) {
        console.log('progreso: '+( event.progress * 100) + "%");
    },
    handleFileError: function(event) {
        console.error('hubo un error');
        console.log(event);
    },
    playS:function(){
      var sound = document.querySelector('#soundSend').children[0];
      this.playSound(sound);
    },
    playN:function(){
      var sound = document.querySelector('#soundNotification').children[0];
      this.playSound(sound);
    },
    playSound:function(el){
      if(el !== null){
        el.pause();
        el.currentTime = 0;
        el.play();
      }
    }
}
track.init();
