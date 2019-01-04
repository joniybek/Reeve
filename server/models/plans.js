module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		"plans",
		{
			id: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				field: "id"
			},
			name: {
				type: DataTypes.STRING(128),
				allowNull: false,
				defaultValue: "",
				field: "name"
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
				field: "description"
			},
			stripeProductId: {
				type: DataTypes.STRING(128),
				allowNull: true,
				field: "stripeProductId"
			},
			currency: {
				type: DataTypes.CHAR(3),
				allowNull: false,
				defaultValue: "aud",
				field: "currency"
			},
			monthlyPrice: {
				type: DataTypes.DECIMAL(6,2),
				allowNull: false,
				defaultValue: "0.00",
				field: "monthlyPrice"
			},
			yearlyPrice: {
				type: DataTypes.DECIMAL(6,2),
				allowNull: false,
				defaultValue: "0.00",
				field: "yearlyPrice"
			},
			newSubscriptionsAllowed: {
				type: DataTypes.INTEGER(1),
				allowNull: false,
				field: "newSubscriptionsAllowed"
			},
			active: {
				type: DataTypes.INTEGER(1),
				allowNull: false,
				defaultValue: "1",
				field: "active"
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				field: "createdAt"
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				field: "updatedAt"
			}
		},
		{
			tableName: "plans"
		}
	);
};