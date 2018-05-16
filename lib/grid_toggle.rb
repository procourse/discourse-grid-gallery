module ::GridViewPlugin

    class GridTarget
        def initialize(type, id)
            @type = type
            @id = id
        end
    end

    class GridUserToggle
        def initialize(target, user)
            @target = target
            @user = user
        end

        # takes param toggle (grid or list)
        def set_preference(toggle)
            key = set_key()
            if key != nil
                ::PluginStore.set("grid_gallery", key, toggle)

        end

        def get_preference
            key = set_key()

            if key != nil
                setting = ::PluginStore.get("grid_gallery", key)

            return setting
        end

        private
        def set_key
            if @target.type === "category" || @target.type === "tag"
                key = "grid_gallery_#{@user.id}_#{@target.type}_#{@target.id}"
            else
                return nil

            return key
        end
    end
