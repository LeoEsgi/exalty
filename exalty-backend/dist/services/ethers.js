"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const MainFactory_json_1 = __importDefault(require("./MainFactory.json"));
const { CONTRACT_ADDRESS, ALCHEMY_ID, PRIVATE_KEY } = process.env;
const alchemyProvider = new ethers_1.ethers.providers.AlchemyProvider("maticmum", ALCHEMY_ID);
// Signer
const signer = new ethers_1.ethers.Wallet(PRIVATE_KEY ? PRIVATE_KEY : "", alchemyProvider);
// Contract
const MainFactory = new ethers_1.ethers.Contract(CONTRACT_ADDRESS ? CONTRACT_ADDRESS : "", MainFactory_json_1.default, signer);
class EthersService {
    constructor() { }
    verifySigner(user, signedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.signed_message)
                return null;
            const address = ethers_1.ethers.utils.recoverAddress(ethers_1.ethers.utils.formatBytes32String(signedMessage), user.signed_message);
            return address !== null && address !== void 0 ? address : null;
        });
    }
    createNewNft(_name, _symbol, _totalSupply, _baseURI) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MainFactory.createNewArt(_name, _symbol, _totalSupply, _baseURI, {
                gasLimit: 1000000,
            });
        });
    }
}
exports.default = EthersService;
_a = EthersService;
EthersService.instance = new _a();
