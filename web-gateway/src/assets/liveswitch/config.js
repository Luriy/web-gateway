var chat;
(function (chat) {
    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.getRegion = function () {
            return this._region;
        };
        Config.setRegion = function (region) {
            this._region = region;
        };
        Config.getGatewayUrl = function () {
            return this._gatewayUrl;
        };
        Config.setGatewayUrl = function (gatewayUrl) {
            this._gatewayUrl = gatewayUrl;
        };
        Config.getSharedSecret = function () {
            return this._sharedSecret;
        };
        Config.setSharedSecret = function (sharedSecret) {
            this._sharedSecret = sharedSecret;
        };
        Config._region = null;
        Config._gatewayUrl = 'https://cloud.liveswitch.io';
        Config._sharedSecret = 'c459cebe6d384f1188dacaa53f5ae1580ad31d6a054a49e08f57a1f4fcee15d1';
        return Config;
    }());
    chat.Config = Config;
})(chat || (chat = {}));
