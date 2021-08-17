class Data {

  callMessagesApi(type, parameters) {

    const accessToken = oktaSignIn.authClient.getAccessToken();

    if (accessToken) {
      // This means that the user is still logged in
      // Make a request using jQuery
      $.ajax({
        // Your API or resource server:
        url: `/data/${type}`,
        data: { info: parameters },
        dataType: 'json',
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        success: function (response) {
          // Received messages!
          //console.log('Messages', response);
          Data.onResponse(response?.info);
        },
        error: function (response) {
          //console.error(response);
        }
      });
    }
  }

  save() {
    let nodelist = document.getElementById("myUL").children;
    let elements = [];

    for (let node of nodelist) {
      elements.push(Base64.encode(node.outerHTML));
    }

    this.callMessagesApi('save', elements);
  }

  restore() {
    this.callMessagesApi('restore');
  }

  static onResponse(elements) {

    if (elements) {
      $(myUL).empty();
      
      for (let element of elements) {
        $(myUL).append(Base64.decode(element));
      }

      setChildrenProperties();
    }
  }
}

const data = new Data;