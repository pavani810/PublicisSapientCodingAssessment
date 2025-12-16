using System.Text.Json;

namespace PharmacyAPI.Services
{
    public class JsonFileService<T>
    {
        private readonly string _filePath;
        private readonly JsonSerializerOptions _options = new JsonSerializerOptions { WriteIndented = true };

        public JsonFileService(string filePath)
        {
            _filePath = filePath;
            if (!File.Exists(_filePath)) File.WriteAllText(_filePath, "[]");
        }

        public List<T> ReadAll()
        {
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<T>>(json, _options) ?? new List<T>();
        }

        public void WriteAll(List<T> items)
        {
            var json = JsonSerializer.Serialize(items, _options);
            File.WriteAllText(_filePath, json);
        }
    }
}
