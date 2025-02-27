/**
 * Set the id to query the order
 */

let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

fetch(`http://127.0.0.1:5000/order/id/${_id}`)
    .then(response => response.json())
    .then(order => {
        ingredients = []
        beverages = []
        for(let _detail of order.detail){
            if(_detail.beverage !== null){
                beverages.push(_detail)
            }
            if(_detail.ingredient !== null){
                ingredients.push(_detail)
            }
        }
        order["ingredients"] = ingredients
        order["beverages"] = beverages
        let template = createRowTemplate(order);
        $("#order").append(template);
    });

/**
 * Find the template tag and populate it with the data
 * @param order
 */
function createRowTemplate(order) {
    let template = $("#order-template")[0].innerHTML;
    return Mustache.render(template, order);
}
