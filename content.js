setInterval(runEvery10Secs, 5000)

var matError = document.createElement("mat-error")
matError.className = "mat-error";
var lastStatus = false;
var parent;

function runEvery10Secs() {
    var matched = false;
    try {
        var ipRanges = document.getElementsByTagName('gce-ip-ranges-input-row')[0].getElementsByClassName("mdc-chip__text")[0].textContent;
        if (ipRanges.includes("0.0.0.0/0")) {
            for (index = 1; index < 10; index++) {
                var input = document.getElementById('mat-input-' + index);
                if (input && input.placeholder == "20, 50-60" && input.value) {
                    parent = input.parentElement.parentElement.parentElement.nextSibling.nextSibling;
                    matError.textContent = "Prisma Cloud Security: Port " + input.value + " is open to the internet, please consider limiting the access";
                    input.parentElement.parentElement.parentElement.nextSibling.nextSibling.appendChild(matError)
                    lastStatus = true;
                    matched = true;
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
    if (matched == false && lastStatus == true) {
        parent.removeChild(matError);
        lastStatus = false;
    }


}