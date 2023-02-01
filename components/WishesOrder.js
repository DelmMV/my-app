import { Text, View, StyleSheet } from "react-native";

export function WishesOrder(order) {
  const ClientsComment = (order) => {
    if (order.ClientComment) {
      return order.ClientComment;
    }
    return false;
  };

  const Wishes = (order) => {
    let res = "";
    if (order.Wishes) {
      order.Wishes.forEach((element) => {
        res += `${element["Name"]}\n`;
      });
      return res;
    }
    return false;
  };
  const wish = Wishes(order);
  const comment = ClientsComment(order);

  const WishAndComment = () => {
    if (wish && comment) {
      return (
        <View>
          <Text style={styles.title}>Пожелания к заказу</Text>
          <Text style={styles.infotext}>{wish}</Text>
          <Text style={styles.infotext}>{comment}</Text>
        </View>
      );
    } else if (wish) {
      return (
        <View>
          <Text style={styles.title}>Пожелания к заказу</Text>
          <Text style={styles.infotext}>{wish}</Text>
        </View>
      );
    } else if (comment) {
      return (
        <View>
          <Text style={styles.title}>Пожелания к заказу</Text>
          <Text style={styles.infotext}>{comment}</Text>
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <WishAndComment />
    </>
  );

  // return (
  //   <>
  //     {wish || comment !== false ? (
  //       <View>
  //         <Text style={styles.title}>Пожелания к заказу</Text>
  //         <Text style={styles.infotext}>{wish}</Text>
  //         <Text style={styles.infotext}>{comment}</Text>
  //       </View>
  //     ) : (
  //       <></>
  //     )}
  //   </>
  // );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#17212b",
  },
  text: {
    color: "white",
    paddingBottom: 20,
    paddingStart: 20,
  },
  button: {
    width: 80,
    height: 40,
    color: "white",
    borderRadius: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 45,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 20,
    //alignSelf: "flex-start",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  infotext: {
    color: "gold",
    textAlign: "left",
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
