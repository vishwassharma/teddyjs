# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :output => 'test/js/app', :notification => false do
  watch(%r{client/(.*)\.coffee})
end

guard 'coffeescript', :output => 'public/js', :notification => false do
  watch(%r{client(.*)\.coffee})
end

guard 'coffeescript', :output => 'test/js', :notification => false do
  watch(%r{test/spec/(.*)\.coffee})
end

#jasmine_conf = "tests/spec/js/support/jasmine.yml"
#spec_location = "tests/spec/js/%s_spec"

#spec_location = "tests/spec/javascripts/%sSpec"

#guard 'jasmine-headless-webkit', :jasmine_config=> jasmine_conf, :notification => false do
  #watch(%r{^app/views/.*\.jst$})
  #watch(%r{src/js/(.*)\.js$}) { |m| newest_js_file(spec_location % m[1]) }
  #watch(%r{public/javascripts/(.*)\.js$})
  #watch(%r{^app/assets/javascripts/(.*)\.(js|coffee)$}) { |m| newest_js_file(spec_location % m[1]) }
  #watch(%r{tests/spec/js/(.*)_spec\.js$}) { |m| newest_js_file(spec_location % m[1]) }
#end

#guard 'compass' do
  #watch('^public/sass/(.*)\.s[ac]ss')
  #watch(%r{public/sass/.+\.s[ac]ss})
#end

guard 'livereload', :notification => false do
  watch(%r{test/js/.+\.js})
  #watch(%r{public/js/.+\.js})
  #watch(%r{app/views/.+\.(erb|haml|slim)})
  #watch(%r{app/helpers/.+\.rb})
  #watch(%r{public/.+\.(css|js|html)})
  #watch(%r{assets/templates/.+\.(html)})
  watch(%r{public/.+\.(html)})
  #watch(%r{config/locales/.+\.yml})
  # Rails Assets Pipeline
  #watch(%r{(app|vendor)/assets/\w+/(.+\.(css|js|html)).*})  { |m| "/assets/#{m[2]}" }
end
