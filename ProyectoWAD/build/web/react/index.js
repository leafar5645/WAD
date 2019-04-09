var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



//import {LoginForm} from './LoginForm';
//import {RegisterForm} from './RegisterForm';

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
    _this.showLogin = _this.showLogin.bind(_this);
    _this.showRegister = _this.showRegister.bind(_this);
    return _this;
  }

  _createClass(Index, [{
    key: 'showLogin',
    value: function showLogin() {
      this.setState({ isLoginOpen: true, isRegisterOpen: false });
    }
  }, {
    key: 'showRegister',
    value: function showRegister() {
      this.setState({ isRegisterOpen: true, isLoginOpen: false });
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        { className: 'root-Index' },
        React.createElement(
          'center',
          null,
          React.createElement(
            'div',
            { id: 'control-box' },
            React.createElement(
              'label',
              { id: 'buttons-login', onClick: this.showLogin },
              'Login'
            ),
            React.createElement(
              'label',
              { id: 'buttons-login', onClick: this.showRegister },
              'Registro'
            )
          ),
          this.state.isLoginOpen && React.createElement(LoginForm, null),
          this.state.isRegisterOpen && React.createElement(RegisterForm, null)
        )
      );
    }
  }]);

  return Index;
}(React.Component);

ReactDOM.render(React.createElement(Index, null), document.getElementById('root'));