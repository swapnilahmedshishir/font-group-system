import { useState } from "react";

const FontManager = () => {
  const [fontGroups, setFontGroups] = useState([
    { id: 1, name: "Group 1", fonts: ["Arial", "Times New Roman"] },
    { id: 2, name: "Group 2", fonts: ["Verdana", "Tahoma"] },
  ]);
  const [selectedFonts, setSelectedFonts] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null);

  const handleEditGroup = (groupId, updatedFonts) => {
    setFontGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId ? { ...group, fonts: updatedFonts } : group
      )
    );
    setEditingGroupId(null); // Close edit mode after saving
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Font Groups</h2>
      {fontGroups.map((group) => (
        <div key={group.id} className="border p-4 mb-4">
          <p className="font-bold">{group.name}</p>
          <p>Fonts: {group.fonts.join(", ")}</p>

          {editingGroupId === group.id ? (
            // Font selection dropdown
            <div>
              <select
                multiple
                value={selectedFonts}
                onChange={(e) =>
                  setSelectedFonts(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                className="border p-2 w-full"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
                <option value="Tahoma">Tahoma</option>
              </select>
              <button
                onClick={() => handleEditGroup(group.id, selectedFonts)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingGroupId(group.id)}
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FontManager;
