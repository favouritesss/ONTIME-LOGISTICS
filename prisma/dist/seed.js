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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var passwordHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.hash(process.env.ADMIN_PASSWORD || "admin123", 10)];
                case 1:
                    passwordHash = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: process.env.ADMIN_EMAIL || "admin@ontime.local" },
                            update: {},
                            create: {
                                email: process.env.ADMIN_EMAIL || "admin@ontime.local",
                                password: passwordHash,
                                role: "admin"
                            }
                        })];
                case 2:
                    _a.sent();
                    // sample shipment
                    return [4 /*yield*/, prisma.shipment.create({
                            data: {
                                trackingNumber: "ONTIME-" + new Date().toISOString().slice(0, 10).replace(/-/g, '') + "-000001-7",
                                senderName: "ACME Corp",
                                senderAddress: "100 Warehouse St, London, UK",
                                recipientName: "John Doe",
                                recipientAddress: "200 Market Ave, Dublin, IE",
                                origin: "London, UK",
                                destination: "Dublin, IE",
                                weight: 12.5,
                                declaredValue: 250.0,
                                serviceLevel: "EXPRESS",
                                events: {
                                    create: [
                                        { statusCode: "PICKED_UP", description: "Picked up from warehouse", city: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
                                        { statusCode: "IN_TRANSIT", description: "Air transit", city: "Manchester", country: "UK", lat: 53.4808, lon: -2.2426 }
                                    ]
                                },
                                invoice: {
                                    create: {
                                        invoiceNumber: "INV-2025-0001",
                                        amount: 75.00,
                                        tax: 15.00,
                                        currency: "GBP"
                                    }
                                }
                            }
                        })];
                case 3:
                    // sample shipment
                    _a.sent();
                    console.log("Seed finished.");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) {
    console.error(e);
    process.exit(1);
}).finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
