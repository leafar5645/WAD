var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React from 'react';
//import $ from 'jquery';
//import ReactDOM from 'react-dom';

var LoginForm = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this.state = { value: '' };

    _this.logear = _this.logear.bind(_this);

    return _this;
  }

  _createClass(LoginForm, [{
    key: 'logear',
    value: function logear(e) {
      var a;
      e.preventDefault();
      var formData = new FormData(e.target);

      $.ajax({
        url: 'Logear',
        type: 'Post',
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        success: function success(data) {
          a = data.toString();
        },
        error: function error() {
          alert("Archivo invalido");
        }
      });
      //console.log(a);
      if (a === "error") {
        this.setState({ value: "usuario o clave incorrecta" });
      } else {
        // this.setState({value: "success"});
        window.location = a;
        //console.log("pedos");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'formulario' },
        React.createElement('br', null),
        React.createElement(
          'form',
          { onSubmit: this.logear, id: 'forma' },
          React.createElement(
            'label',
            null,
            'Name:'
          ),
          React.createElement('input', { type: 'text', name: 'correo', id: 'inputs' }),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Password'
          ),
          React.createElement('input', { type: 'password', name: 'passwords', id: 'inputs' }),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement('input', { type: 'submit', value: 'Entrar', id: 'submitLogin' }),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            this.state.value,
            ' '
          )
        )
      );
    }
  }]);

  return LoginForm;
}(React.Component);

//export default LoginForm;