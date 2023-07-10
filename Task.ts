type LeafValue = string | (() => string);

function typedFreeze<T extends Record<string, any>>(obj: T): Readonly<T> {
  function checkLeaves(obj: any): boolean {
    for (const key in obj) {
      if (typeof obj[key] === "object" && !checkLeaves(obj[key])) {
        return false;
      }
      if (
        typeof obj[key] !== "object" &&
        typeof obj[key] !== "string" &&
        typeof obj[key] !== "function"
      ) {
        return false;
      }
    }
    return true;
  }

  if (!checkLeaves(obj)) {
    throw new Error(
      "Leaves of the passed object must be either string or () => string."
    );
  }

  Object.freeze(obj);

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      typedFreeze(obj[key]);
    }
  }

  return obj as Readonly<T>;
}

const obj = {
  key1: {
    key2: "value",
    key3: {
      key4: () => "value",
    },
  },
  key5: "value",
};

const frozenObj = typedFreeze(obj);
console.log("frozenObj", frozenObj);

const obj2 = {
  key1: {
    key2: {},
    key3: {
      key4: () => "value",
    },
  },
  key5: "value",
};

try {
  const frozenObj2 = typedFreeze(obj2);
} catch (error) {
  console.error(error.message);
}

const obj3 = {
  key1: {
    key2: "value",
    key3: {
      key4: "value",
    },
  },
  key5: "value",
};

try {
  const frozenObj3 = typedFreeze(obj3);
} catch (error) {
  console.error(error.message);
}
