class showMessages extends Phaser.Scene {
  constructor() {
    super("showMessages");
  }
  preload() {
    this.load.plugin('rexlifetimeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlifetimeplugin.min.js', true);



  }
  init(data) {
    this.level = data.level;
    this.group = data.group

  }
  create() {
    this.messagesContaier = this.add.container()
    this.count = 0
    //this.newMessage('hello world')
    // this.newMessage('Really, I said hello')
    // this.newMessage('nevermind')
    /* this.testMessage = this.add.image(0, 100, 'blank').setOrigin(0).setTint(0x000000).setAlpha(.7);
    this.testMessage.displayWidth = game.config.width;
    this.testMessage.displayHeight = 75
    this.infoText = this.add.bitmapText(15, this.testMessage.y + 30, 'topaz', 'status message', 40).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1); */

    // + this.messagesContaier.count() * 75
    var clearText = this.add.bitmapText(885, 300, 'topaz', 'CLEAR', 40).setOrigin(1, .5).setTint(0xcbf7ff).setAlpha(1).setInteractive();
    clearText.on('pointerdown', this.clearAll, this)
  }
  newMessage(text) {
    var messageContainer = this.add.container()
    messageContainer.name = this.count
    var testMessage = this.add.image(0, 0, 'blank').setOrigin(0).setTint(0x000000).setAlpha(.7);
    testMessage.displayWidth = game.config.width;
    testMessage.displayHeight = 75
    messageContainer.add(testMessage)
    var infoText = this.add.bitmapText(15, 30, 'topaz', text, 40).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1).setInteractive();

    //var remove = this.add.image(infoText.x + infoText.width, 0, 'delete_icon').setOrigin(0, 0).setInteractive().setScale(.75).setAlpha(1);
    infoText.id = this.count
    infoText.on('pointerup', this.removeMessage.bind(this, infoText));
    messageContainer.add(infoText)
    // this.messages.push(messageContainer)
    messageContainer.y = 300 + this.messagesContaier.count() * 75
    this.messagesContaier.add(messageContainer)
    this.count++
  }
  removeMessage(message) {
    console.log(message.id)
    var child = this.messagesContaier.getByName(message.id);
    //this.messages[message.id].destroy()
    // var removedEl = this.messages.splice(message.id, 1);
    // console.log(removedEl)
    child.destroy()
    // console.log(this.messagesContaier)
    var num = this.messagesContaier.count()
    var tempCount = 0
    this.messagesContaier.iterate(function (child) {
      child.y = 300 + tempCount * 75
      tempCount++
    });
  }
  clearAll() {
    this.messagesContaier.removeAll(true);
  }
}