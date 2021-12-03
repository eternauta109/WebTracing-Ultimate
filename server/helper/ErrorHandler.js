class ErrorHandler extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.handle();
  }

  handle() {
    switch (this.code) {
      case 400:
        this.badRequest();
        break;
      case 404:
        this.notFound();
        break;
      case 500:
        this.serverError();
        break;
      default:
        this.message = `${this.message}||'errore generico non gestito'`;
    }
  }

  badRequest() {

    this.message = `${this.message || 'richiesta non corretta'}`;
  }

  notFound() {
     
    this.message = `${this.message||'risorsa non trovata'}`;
  }

  serverError() {
    //si puo inserire l'errore all'interno di un db
    this.message = `${this.message||'errore server'}`;
  }
}


module.exports =ErrorHandler;