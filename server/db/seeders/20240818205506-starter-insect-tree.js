'use strict';

/** @type {import('sequelize-cli').Migration} */

const {InsectTree, Insect, Tree} = require('../models')

const insectTrees = [
  {
    insectName: 'Western Pygmy Blue Butterfly',
    tree: 'General Sherman'
  },
  {
    insectName: 'Western Pygmy Blue Butterfly',
    tree: 'General Grant'
  },
  {
    insectName: 'Western Pygmy Blue Butterfly',
    tree: 'Lincoln'
  },
  {
    insectName: 'Western Pygmy Blue Butterfly',
    tree: 'Stagg'
  },
  {
    insectName: 'Patu Digua Spider',
    tree: 'Stagg'
  },
];

let list = [];
insectTrees.forEach(async(insectTree) => {
  const tree = await Tree.findOne({where: {tree:insectTree.tree}});
  const insect = await Insect.findOne({where: {name: insectTree.insectName}});

  list.push({
    treeId:tree.id,
    insectId: insect.id
  })
  
})

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await InsectTree.bulkCreate(list
    
    ,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('InsectTrees', list)
  }
};
