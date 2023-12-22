const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MutualSchema = new Schema ({
    name: {type: String},
    creationDate: {type: Date, default: Date.now},
    typeMutual: {type: String},
    helps: [{nameHelp: String, descHelp: String}],
    members: [{emailMember: String, points: Number, status: String}],
}, {
    virtuals: {
        formatDate: {
            get() {
                return this.creationDate.toDateString();
            }
        }
    },

    statics: {
        countMutuals() {
            return this.countDocuments();
        }
    }
});

MutualSchema.method("getAdmins", function() {
    if(this.members) {
        let admins = [];
        for(member of this.members) {
            if(member.status == "Admin") {
                admins.push(member);
            }
        }
        return admins;
    }
    return undefined;
});

MutualSchema.method("isPackage", function() {
        if(this.typeMutual == "Package") {
            return true;
        } 
        return false;
});

const Mutual = mongoose.model("Mutual", MutualSchema);

module.exports = Mutual;