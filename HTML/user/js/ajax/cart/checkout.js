let baseUrl = "http://localhost:8080"

function showCartDetail(){
    let url = `${baseUrl}/users/cart`
    $.ajax({
        type: "GET",
        url: url,
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFueWI5ODEiLCJpYXQiOjE2MzYxNjU5ODQsImV4cCI6ODgwMzYxNjU5ODR9.dtTA4i_YP2P-cCWenHQsS-EWlRvogsKWcdV4BCIvLLAHKrrANwrMb2dEWk06q5RLjBsXhKKMDmBzJX_8K0GPCg"
        },
        success: function (data){
            console.log(data)
            drawCartDetail(data)
        }
    }).fail(function (){
        console.log('fail')
    })
}

function drawCartDetail(data){
    let content = "";
    let estimatedPayment = 0;
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        var product = element.product;
        var price = product.price*(1 - product.saleOff/100)
        estimatedPayment += price * element.quantity
        content += `
                                             <tr>
                                                <td>
                                                    <h6 class="order-h6">${product.name}</h6>
                                                    <span class="order-span-quantity">x 1</span>
                                                </td>
                                                <td>
                                                    <h6 class="order-h6">${price}</h6>
                                                </td>
                                            </tr>`
    }

    content +=                              `<tr>
                                                <td>
                                                    <h3 class="order-h3">Subtotal</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$${estimatedPayment}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Shipping</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$0.00</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Tax</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$0.00</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Total</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$${estimatedPayment}</h3>
                                                </td>
                                            </tr>`
    $("#cart").html(content)
}