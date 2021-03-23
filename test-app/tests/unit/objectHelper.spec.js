import { removeNullProperties } from "@/logic/objectHelper";

test("no null properties should exits", () => {
  const object = {
    null: ["asdf", "asdf", "asdf"],
    null: ["asdf", "asdf", "asdf"],
    prop: ["asdf", "asdf", "asdf"],
  };
  removeNullProperties(object);
  expect(object["null"]).toBeUndefined();
  expect(object["props"]).toBe();
});
