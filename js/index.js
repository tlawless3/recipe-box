"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//sets and stores recipes in local storage
var recipes = [{ name: "Spaghetti",
  ingredients: ["Tomato Sauce", "Noodles"],
  directions: "Cook Noodles, add sauce"
}, { name: "Bread",
  ingredients: ["Flour", "Water", "Yeast"],
  directions: "Combine, then cook"
}];
localStorage.setItem("recipes", JSON.stringify(recipes));

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      recipes: JSON.parse(localStorage.getItem("recipes"))
    };
    return _this;
  }

  Table.prototype.addRecipe = function addRecipe() {
    var ingredientStr = $("#recipeIngredients").val();
    var ingredientArr = ingredientStr.split(",");

    var newRecipeObj = {
      name: $("#recipeName").val(),
      ingredients: ingredientArr,
      directions: $("#recipeDirections").val()
    };

    console.log(newRecipeObj);

    recipes.push(newRecipeObj);
    console.log(recipes);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({
      recipes: JSON.parse(localStorage.getItem("recipes"))
    });
  };

  Table.prototype.buildRecipes = function buildRecipes() {
    var sections = this.state.recipes.map(function (recipe, index) {
      return React.createElement(Recipe, {
        recipe: recipe,
        key: index
      });
    });
    return sections;
  };

  Table.prototype.render = function render() {
    var recipes = this.buildRecipes();
    return React.createElement(
      "div",
      null,
      recipes,
      React.createElement(Modal, { update: this.addRecipe.bind(this) })
    );
  };

  return Table;
}(React.Component);

var Recipe = function (_React$Component2) {
  _inherits(Recipe, _React$Component2);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      open: false
    };
    return _this2;
  }

  Recipe.prototype.toggleState = function toggleState() {
    this.setState({
      open: !this.state.open
    });
  };

  Recipe.prototype.getStatus = function getStatus() {
    if (this.state.open) {
      return "open";
    } else {
      return "closed";
    }
  };

  Recipe.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "recipe" },
      React.createElement(
        "h2",
        { className: "recipeName", onClick: this.toggleState.bind(this) },
        this.props.recipe.name
      ),
      React.createElement(
        "div",
        { className: "recipeContent " + this.getStatus() },
        this.props.recipe.ingredients.map(function (ingredient, index) {
          return React.createElement(
            "p",
            { className: "ingredients" },
            ingredient
          );
        }),
        React.createElement(
          "p",
          { className: "directions" },
          this.props.recipe.directions
        ),
        React.createElement(
          "button",
          { type: "button", className: "btn btn-danger", on: true },
          "Delete Recipe"
        ),
        React.createElement(
          "button",
          { type: "button", className: "btn" },
          "Edit Recipe"
        )
      )
    );
  };

  return Recipe;
}(React.Component);

//TODO comment code

var Modal = function (_React$Component3) {
  _inherits(Modal, _React$Component3);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      showModal: false
    };
    return _this3;
  }

  Modal.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { type: "button", className: "btn btn-primary addModalButton", "data-toggle": "modal", "data-target": "#myModal" },
        " Add Recipe "
      ),
      React.createElement(
        "div",
        { className: "modal fade", id: "myModal", tabindex: "-1", role: "dialog", "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" },
        React.createElement(
          "div",
          { className: "modal-dialog", role: "document" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "h5",
                { className: "modal-title", id: "ModalLabel" },
                "Add a recipe"
              ),
              React.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                React.createElement(
                  "span",
                  { "aria-hidden": "true" },
                  "×"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "form",
                { id: "recipeForm" },
                React.createElement(
                  "div",
                  { className: "row recipeInput" },
                  React.createElement("input", { type: "text", id: "recipeName", placeholder: "Name" })
                ),
                React.createElement(
                  "div",
                  { className: "row recipeInput" },
                  React.createElement("input", { type: "text", id: "recipeIngredients", placeholder: "Ingredients, comma seperated" })
                ),
                React.createElement(
                  "div",
                  { className: "row recipeInput" },
                  React.createElement("input", { type: "text", id: "recipeDirections", placeholder: "Directions" })
                )
              )
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
                "Close"
              ),
              React.createElement(
                "button",
                { type: "button", className: "btn btn-primary", onClick: this.props.update, "data-dismiss": "modal" },
                "Submit"
              )
            )
          )
        )
      )
    );
  };

  return Modal;
}(React.Component);

var App = function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Table, null)
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));