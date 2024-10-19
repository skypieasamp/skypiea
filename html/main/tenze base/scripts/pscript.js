/*    document.getElementById('checkbox').addEventListener('change', function() {
            const button = document.getElementById('closeterms');
            button.disabled = !this.checked;
        });
*/

        function closeTerms() {
            document.getElementById('tearmscontainer').style.display = 'none';
            document.body.style.overflowY = 'scroll';
        }
        
function payment() {
    var paymentElement = document.getElementById('payment');
    paymentElement.style.display = (paymentElement.style.display === 'flex') ? 'none' : 'flex';
}