exports.ok = function(status, values, res) {
    var data = {
        'status': status,
        'body': values
    };
    res.json(data);
    res.end();
}