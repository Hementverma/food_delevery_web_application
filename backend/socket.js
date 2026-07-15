import User from "./models/user.model.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    socket.on("identity", async ({ userId }) => {
      try {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
          isOnline: true,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("updateLocation", async ({ latitude, longitude, userId }) => {
      try {
        const user = await User.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          socketId: socket.id,
          isOnline: true,
        });

        if (user) {
          io.emit("updateDeliveryLocation", {
            deliveryBoyId: userId,
            latitude,
            longitude,
          });
        }
      } catch (err) {
        console.log("updateLocation error");
      }
    });

    socket.on("disconnect", async () => {
      try {
        await User.findOneAndUpdate(
          { socketId: socket.id },
          { socketId: null, isOnline: false }
        );
      } catch (err) {
        console.log(err);
      }
    });
  });
};
