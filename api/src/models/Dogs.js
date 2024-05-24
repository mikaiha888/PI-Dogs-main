const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 40]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true,
    },
    height: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isHeightValid(value) {
          if (!value || typeof value !== 'object') {
            throw new Error('La propiedad "height" debe ser un objeto.');
          }
      
          if (!('min' in value)) {
            throw new Error('El objeto "height" debe tener la propiedad "min".');
          }
      
          if (typeof value.min !== 'number') {
            throw new Error('El valor de "min" debe ser un número.');
          }
      
          if (value.min > value.max) {
            throw new Error('El valor "min" debe ser menor que el valor "max".');
          }
        },
      },
    },
    weight: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isWeightValid(value) {
          if (!value || typeof value !== 'object') {
            throw new Error('La propiedad "weight" debe ser un objeto.');
          }
      
          if (!('min' in value)) {
            throw new Error('El objeto "weight" debe tener la propiedad "min".');
          }
      
          if (typeof value.min !== 'number') {
            throw new Error('El valor de "min" debe ser un número.');
          }
      
          if (value.min > value.max) {
            throw new Error('El valor "min" debe ser menor que el valor "max".');
          }
        },
      },
    },
    life_span: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isLifeSpanValid(value) {
          if (!value || typeof value !== 'object') {
            throw new Error('La propiedad "life_span" debe ser un objeto.');
          }
  
          if (!('min' in value)) {
            throw new Error('El objeto "life_span" debe tener la propiedad "min".');
          }
  
          if (typeof value.min !== 'number') {
            throw new Error('El valor de "min" debe ser un número.');
          }
  
          if (value.min > value.max) {
            throw new Error('El valor "min" debe ser menor que el valor "max".');
          }
        },
      },
    },    
  }, { timestamps: false });
};