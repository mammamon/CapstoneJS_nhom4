//lấy data từ mockAPI
function getProductList() {
    let promise = axios({
        url: 'https://649d36a19bac4a8e669d62a2.mockapi.io/product',
        method: 'GET',
    })
    promise
        .then(function (result) {
            console.log('result: ', result.data)
            renderProductList(result)
        })
        .catch(function (error) {
            console.log(error)
        })
}
getProductList();