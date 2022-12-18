class MerkleTree {

    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        let root = this.merge(this.leaves);
        // console.log("root", root);
        return root;
    }

    merge(leaves) {
        // ---- algorithm recurse
        if(leaves.length == 1){
            return leaves[0];
        }
        let group = this.doMerge(leaves);
        return this.merge(group);

        // // ---- algorithm loop
        // let group = this.doMerge(leaves);
        // while(group.length > 1){
        //     group = this.merge(group);
        // }
        // return group;
    }

    doMerge(leaves){
        if(leaves.length == 1){
            return leaves[0];
        }
        const group = [];
        let i = 0; 
        while(i < leaves.length){
            let groupId = Math.floor(i/2);
            group[groupId] = this.concat(leaves[i++], leaves[i++]);
            if(i == leaves.length - 1){ // reach end (single one)
                group[groupId + 1] = leaves[i];
                break;
            }
        }
        return group;
    }

    getProof(index){
        let merkleProof = [];
        let orderId = 0;
        let group = this.leaves;
        while(true){
            if(group.length == 1){
                break;
            }
            let isLeft = index % 2 != 0; // !0 => index leaf right, then other one is left
            if(isLeft){
                merkleProof[orderId] = {data: group[index - 1], left: true};
                orderId++;
            }else{
                if(index < group.length - 1){ // not last one
                    merkleProof[orderId] = {data: group[index + 1], left: false};
                    orderId++;
                }
            }
            // layer up
            group = this.doMerge(group);
            index = Math.floor(index / 2);
        }
        return merkleProof;
        
    }
}

module.exports = MerkleTree;