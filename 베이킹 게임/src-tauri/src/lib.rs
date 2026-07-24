use tauri::Manager;
use std::fs;

#[tauri::command]
fn save_game(app_handle: tauri::AppHandle, data: String) -> Result<(), String> {
  // AppData 디렉토리 경로 획득
  let app_dir = app_handle.path().app_data_dir().map_err(|e| e.to_string())?;
  
  // AppData 디렉토리가 없으면 생성
  if !app_dir.exists() {
    fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
  }
  
  // save.json 파일 경로 설정
  let file_path = app_dir.join("save.json");
  
  // 데이터 기록
  fs::write(file_path, data).map_err(|e| e.to_string())?;
  Ok(())
}

#[tauri::command]
fn load_game(app_handle: tauri::AppHandle) -> Result<String, String> {
  let app_dir = app_handle.path().app_data_dir().map_err(|e| e.to_string())?;
  let file_path = app_dir.join("save.json");
  
  if !file_path.exists() {
    return Err("Save file not found".to_string());
  }
  
  // 데이터 읽기
  let content = fs::read_to_string(file_path).map_err(|e| e.to_string())?;
  Ok(content)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![save_game, load_game])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
